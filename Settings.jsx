const { React, getModuleByDisplayName } = require('powercord/webpack');
const { SliderInput, SwitchItem } = require('powercord/components/settings');
const { Card, AsyncComponent } = require('powercord/components');
const FormText = AsyncComponent.from(getModuleByDisplayName('FormText'));
const TextArea = require('./TextArea.jsx');

module.exports = class Settings extends React.Component {
    constructor(props) {
        super();
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
                minValue={ 1 }
                maxValue={ 10 }
                markers={[ 1, 5, 10 ]}
                initialValue={this.props.getSetting('delay')}
                onValueChange={val => this.props.updateSetting('delay', parseFloat(val))}
                note="Delay in seconds between custom status changes"
                onValueRender={ v => <span>{Math.round(v*10)/10} s</span> }
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
              <Card style={{"padding":"18px"}}>
                <FormText>
                  Feel free to check out some of my other plugins on <a href="https://github.com/power-plugs?tab=repositories" target="_BLANK">GitHub</a>!
                </FormText>
              </Card>
            </div>
        );
    }
};