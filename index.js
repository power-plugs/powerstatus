const { React, getModuleByDisplayName } = require('powercord/webpack');
const { Plugin } = require('powercord/entities');
var { getModule } = require('powercord/webpack');

const Settings = require('./Settings.jsx');

module.exports = class PowerStatus extends Plugin {
    startPlugin() {
        if (!this.settings.get('statuses'))
          this.settings.set('statuses', '');
        if (!this.settings.get('delay'))
          this.settings.set('delay', 2.5);
        if (!this.settings.get('enable'))
          this.settings.set('enable', true);
        
        powercord.api.settings.registerSettings('powerstatus', {
            category: this.entityID,
            label: 'Custom Status',
            render: Settings
        });

        this.main();
    }

    pluginWillUnload () {
        powercord.api.settings.unregisterSettings('powerstatus');
    }

    async main(statuses) {
        var stats = this.settings.get('statuses');
        var statuses = stats.split("\n");
        if(statuses.length == 0)
            return;
        
        var delay = parseInt(this.settings.get('delay')) * 1000;
        var i = Math.round((new Date()).getTime() / delay) % statuses.length;
        
        if(this.settings.get('enable'))
            await this.setStatus(statuses[i]);
        setTimeout(() => {
            this.main(statuses);
        }, delay);
    }

    async setStatus(text) {
        require('powercord/webpack').getModule(['updateRemoteSettings'], false).updateRemoteSettings({
            customStatus: {
                text: text
            }
        });
    }
}