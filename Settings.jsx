const { React, getModuleByDisplayName } = require('powercord/webpack');
const { SliderInput } = require('powercord/components/settings');
const { Card, AsyncComponent } = require('powercord/components');
const FormText = AsyncComponent.from(getModuleByDisplayName('FormText'));
const TextArea = require('./TextArea.jsx');

module.exports = class Settings extends React.Component {
    constructor(props) {
        super();

        this.settings = props.settings;
        this.state = {name: null};
    }

    render() {
        return (
            <div>
              <SliderInput
                minValue={ 250 }
                maxValue={ 10000 }
                markers={[ 250, 1000, 2500, 5000, 7500, 10000 ]}
                initialValue={this.settings.get('delay')}
                onValueChange={val => this.settings.set('delay', parseInt(val))}
                note="Delay in milliseconds between custom status changes"
                onValueRender={ v => <span>{Math.round(v)} ms</span> }
              >
                Update Delay
              </SliderInput>
              <TextArea
                value={this.settings.get('statuses')}
                onChange={val => this.settings.set('statuses', val.toString())}
                rows={8}
              >
                Statuses (Newline Separated)
              </TextArea>
              <Card style={{"padding":"18px"}}>
                <FormText>
                  Feel free to check out some of my other plugins on <a href="https://github.com/LilSizzurp?tab=repositories&q=power" target="_BLANK">GitHub</a>!
                </FormText>
              </Card>
            </div>
        );
    }
};