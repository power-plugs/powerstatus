const { React, getModuleByDisplayName } = require('powercord/webpack');
const { TextInput } = require('powercord/components/settings');
const { Card, Button, AsyncComponent } = require('powercord/components');
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
              <TextArea
                value={this.settings.get('statuses')}
                onChange={val => this.settings.set('statuses', val.toString())}
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