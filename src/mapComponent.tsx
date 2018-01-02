import * as React from 'react';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { geoConicConformalSpain } from 'd3-composite-projections';

interface State {
  geoData: feature[];
}

const featuresUrl = 'https://gist.githubusercontent.com/carlostxm/2f2382656751ae6d85fc35fff118b921/raw/11dd9cc5e122d315b921618f3ce08b46c646df17/spain-municipalities.json';

export class MapComponent extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      geoData: [],
    }
  }

  projection() {
    return geoConicConformalSpain();
  }

  checkStatus = (response: Response): Response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      throw error;
    }
  }

  parseJSON = (response: Response): any => {
    return response.json();
  }

  loadGeoData = (geoData: any) => {
    this.setState({
      geoData: feature(geoData, geoData.objects.provinces).features,
    });
  }

  componentDidMount() {
    fetch(featuresUrl)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(this.loadGeoData)
  }

  paintRegion = (value : number) => (
    `rgba(38,50,56,${1 / this.state.geoData.length * value + 0.2})`
  )

  render() {
    return (
      <svg width={800} height={500}>
        <g className="provinces">
          {
            this.state.geoData.map((d, i) => (
              <path
                className="map-region"
                key={`path-${i}`}
                d={geoPath().projection(this.projection())(d)}
                fill={this.paintRegion(i)}
                stroke='#FFFFFF'
                strokeWidth='0.5'
              />
            ))
          }
        </g>
        <g className="markers">
          <circle
            cx={ this.projection()([-4.419996, 36.726788])[0] }
            cy={ this.projection()([-4.419996, 36.726788])[1] }
            r={ 10 }
            fill="#E91E63"
            className="marker"
          />
        </g>
      </svg>
    )
  }

}