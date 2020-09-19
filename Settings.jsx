const { React, getModuleByDisplayName } = require('powercord/webpack');
const { SliderInput, SwitchItem } = require('powercord/components/settings');
const { Card, AsyncComponent } = require('powercord/components');
const TextArea = require('./TextArea.jsx');

Math.clamp = function(num, min, max) {
  return Math.min(Math.max(num, min), max);
};

module.exports = class Settings extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        minValue: 1000,
        maxValue: 600000,
        markers: []
      }

      for(let i = this.state.minValue / 1000; i <= this.state.maxValue / 1000; ++i) {
        let v = i*1000;
        let r = Math.floor(this.parseVal(v) / 1000);
        if(r == 1 && this.state.markers.length == 0) this.state.markers.push(v);
        if(!(r%60) && (r*1000) >= this.state.minValue) this.state.markers.push(v);
      }
    }

    parseVal(val) {
      var n = (val/this.state.maxValue)*2;
      var exp = Math.exp(n) / Math.exp(2);
      var res = val*exp;
      return Math.clamp(res, this.state.minValue, this.state.maxValue);
    }

    parseTime(duration) {
      duration = this.parseVal(duration);
      var ms = parseInt((duration % 1000) / 100);
      var sec = Math.floor((duration / 1000) % 60);
      var min = Math.floor((duration / (1000 * 60)) % 60);

      if(min < 1)
        if(ms < 1)
          return `${sec}s`;
        else
          return `${sec}.${ms}s`;
      else if(sec < 1)
        return `${min}m`;
      else if(ms < 1)
        return `${min}m ${sec}s`;
      else
        return `${min}m ${sec}.${ms}s`;
    }

    render() {
        return (
            <div>
              <SwitchItem
                value={this.props.getSetting('enable', true)}
                onChange={() => this.props.toggleSetting('enable', true)}
                  note='Turn off if you want to disable the status changer'
              >
                Enabled
              </SwitchItem>
              <SliderInput
                minValue={this.state.minValue}
                maxValue={this.state.maxValue}
                markers={this.state.markers}
                onMarkerRender={v => <span>{this.parseTime(v)}</span>}
                initialValue={this.props.getSetting('delay')}
                onValueChange={val => this.props.updateSetting('delay', parseFloat(val))}
                note="Delay in seconds between custom status changes"
                onValueRender={v => <span>{this.parseTime(this.parseVal(v))}</span>}
              >
                Update Delay
              </SliderInput>
              <TextArea
                value={this.props.getSetting('statuses')}
                onChange={val => this.props.updateSetting('statuses', val.toString())}
                rows={8}
              >
                Statuses (Newline Separated)
              </TextArea>
            </div>
        );
    }
};