"""Reproduce the October star-versus-absolute-energy story without older snapshots."""
from pathlib import Path
from collections import defaultdict
import argparse
import csv
import hashlib
import json
import math
import statistics

ENERGY='Labelled energy consumption (kWh/year)'
FIELDS=['Star2','screensize',ENERGY,'Brand_Reg','Screen_Tech','ExpDate']

def analyse(source):
    raw=list(csv.DictReader(source.open(encoding='utf-8-sig')))
    rows=raw;counts={'raw_rows':len(rows)}
    for key,condition in [
        ('australia_rows',lambda r:'Australia' in r['SoldIn'].split(',')),
        ('available_rows',lambda r:r['Availability Status']=='Available'),
        ('approved_rows',lambda r:r['SubmitStatus']=='Approved'),
        ('unexpired_rows',lambda r:r['ExpDate']>='2026-10-03'),
    ]:
        rows=[r for r in rows if condition(r)];counts[key]=len(rows)
    groups=defaultdict(list)
    for r in rows:groups[r['Submit_ID']].append(r)
    conflicts={c:sum(len({r[c] for r in rs})>1 for rs in groups.values()) for c in FIELDS}
    assert not any(conflicts.values()), conflicts
    unique=[]
    for rs in groups.values():
        r=dict(rs[0]);r.update(stars=float(r['Star2']),inches=round(float(r['screensize'])/2.54),energy=float(r[ENERGY]))
        assert r['energy']>0 and float(r['screensize'])>0 and 0<=r['stars']<=10
        unique.append(r)
    counts['registrations']=len(unique)
    def summary(size,stars,population=unique):
        selected=[r for r in population if r['inches']==size and r['stars']==stars]
        values=[r['energy'] for r in selected]
        return {'inches':size,'stars':stars,'n':len(values),'median_kwh':statistics.median(values),
                'min_kwh':min(values),'max_kwh':max(values)}
    chart1=[summary(55,3),summary(75,5)]
    grid=[summary(size,star) for star in (3,5,6) for size in (55,65,75,85)]
    same_size=[summary(65,3),summary(65,7)]
    smaller=[r for r in unique if r['inches']==55 and r['stars']==3]
    larger=[r for r in unique if r['inches']==75 and r['stars']==5]
    pairs=[{'smaller_id':a['Submit_ID'],'larger_id':b['Submit_ID'],
            'smaller_kwh':a['energy'],'larger_kwh':b['energy'],'extra_kwh':b['energy']-a['energy']}
           for a in smaller for b in larger]
    mx=statistics.mean(r['inches'] for r in unique);my=statistics.mean(r['stars'] for r in unique)
    corr=sum((r['inches']-mx)*(r['stars']-my) for r in unique)/math.sqrt(
        sum((r['inches']-mx)**2 for r in unique)*sum((r['stars']-my)**2 for r in unique))
    # Repeat the descriptive cohort medians under listing-row weighting.
    listing=[]
    for r in rows:
        r=dict(r);r.update(inches=round(float(r['screensize'])/2.54),stars=float(r['Star2']),energy=float(r[ENERGY]));listing.append(r)
    result={'source':source.name,'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
            'counts':counts,'conflicts':conflicts,'chart1':chart1,'grid':grid,'same_size':same_size,
            'pairs':{'n':len(pairs),'larger_more_energy':sum(p['extra_kwh']>0 for p in pairs),
                     'min_extra_kwh':min(p['extra_kwh'] for p in pairs),'max_extra_kwh':max(p['extra_kwh'] for p in pairs)},
            'median_extra_pct':100*(chart1[1]['median_kwh']/chart1[0]['median_kwh']-1),
            'same_size_reduction_pct':100*(1-same_size[1]['median_kwh']/same_size[0]['median_kwh']),
            'star_size_pearson_r':corr,
            'listing_sensitivity':[summary(55,3,listing),summary(75,5,listing),summary(65,3,listing),summary(65,7,listing)]}
    return result, unique, pairs

def export_csv(path,rows):
    with path.open('w',encoding='utf-8',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)

def grid_svg(grid):
    colors={3:'#a56829',5:'#39716b',6:'#5d658f'}
    x={55:95,65:245,75:395,85:545}
    y=lambda v:320-v/1200*260
    out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 400" role="img" aria-labelledby="title desc">',
         '<title id="title">At the same star rating, bigger TVs use more electricity</title>',
         '<desc id="desc">Median labelled kWh per year for 3, 5 and 6 star registrations at 55, 65, 75 and 85 inches. Exact values and cohort counts appear in the page data table.</desc>',
         '<rect width="650" height="400" fill="#ffffff"/>',
         '<g font-family="Arial, sans-serif" font-size="13" fill="#65685d">',
         '<text x="55" y="26">Median labelled energy (kWh/year)</text>']
    for v in [0,300,600,900,1200]:
        yy=y(v);out += [f'<line x1="75" x2="560" y1="{yy}" y2="{yy}" stroke="#e6e6de"/>',f'<text x="63" y="{yy+4}" text-anchor="end">{v:,}</text>']
    for size,xx in x.items():out.append(f'<text x="{xx}" y="345" text-anchor="middle">{size}″</text>')
    for star in [3,5,6]:
        points=[r for r in grid if r['stars']==star]
        coords=' '.join(f'{x[r["inches"]]},{y(r["median_kwh"]):.3f}' for r in points)
        dash={3:'',5:' stroke-dasharray="7 4"',6:' stroke-dasharray="2 4"'}[star]
        out.append(f'<polyline points="{coords}" fill="none" stroke="{colors[star]}" stroke-width="3"{dash}/>')
        for r in points:
            out.append(f'<circle cx="{x[r["inches"]]}" cy="{y(r["median_kwh"]):.3f}" r="5" fill="{colors[star]}"><title>{r["inches"]} inches, {star} stars: {r["median_kwh"]} kWh/year; n={r["n"]}</title></circle>')
        r=points[-1];out.append(f'<text x="565" y="{y(r["median_kwh"])+4:.3f}" fill="{colors[star]}">{star} stars</text>')
    out+=['<text x="320" y="376" text-anchor="middle">Nominal screen diagonal (inches), not time</text></g></svg>']
    return '\n'.join(out)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('csv',type=Path);p.add_argument('--output',type=Path,default=Path('data'))
    a=p.parse_args();result,unique,pairs=analyse(a.csv);a.output.mkdir(parents=True,exist_ok=True)
    (a.output/'star-trap-analysis.json').write_text(json.dumps(result,indent=2)+'\n')
    for name,rs in [('star-trap-cohorts.csv',result['grid']),('star-trap-size-comparison.csv',result['chart1']),
                    ('star-trap-same-size.csv',result['same_size']),('star-trap-pairs.csv',pairs)]:export_csv(a.output/name,rs)
    svg=Path(__file__).resolve().parents[1]/'assets/img/star-rating-grid.svg'
    svg.write_text(grid_svg(result['grid']))
    print(json.dumps(result,indent=2))
