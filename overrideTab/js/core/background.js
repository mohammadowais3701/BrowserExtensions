'use strict';

/* global utils */

const OPTIONS_PAGE = 'html/options.html';
const REMOVED_IN_VERSION = 14;

/**
 * @exports newtaboverride
 */
const newtaboverride = {
  /**
   * Fired when the extension is first installed, when the extension is updated to a new version or when the browser
   * is updated to a new version. We want to show a badge on our toolbar icon when the extension is first installed.
   * If the legacy version of this add-on was previously installed we want to open the options page.
   *
   * @param {runtime.OnInstalledReason} details - details.reason contains the reason why this event is being dispatched
   *
   * @returns {void}
   */
  async onInstalledHandler (details) {
    // new install
    if (details.reason === 'install') {
      browser.browserAction.setBadgeText({ text : '★' });
    }
    // update
    if (details.reason === 'update') {
      if (utils.parseVersion(details.previousVersion).major < REMOVED_IN_VERSION) {
        const option = await browser.storage.local.get();

        if (option.type === 'default' || option.type === 'about:blank' || option.type === 'about:home') {
          browser.storage.local.set({ type : 'custom_url' });
        }
      }
    }
  },

  /**
   * Fired whenever the user changes the input, after the user has started interacting with the add-on by entering
   * its keyword in the address bar and then pressing the space key.
   *
   * @param {string} input - user input in the address bar, not including the add-on's keyword itself or the space
   *                 after the keyword<br /><br />
   *                 <strong>Supported value:</strong> settings
   * @param {function} suggest - a callback function that the event listener can call to supply suggestions for the
   *                   address bar's drop-down list
   *
   * @returns {void}
   */
  showOmniboxSuggestions (input, suggest) {
    const availableCommands = ['settings'];
    const suggestions = [];

    for (const command of availableCommands) {
      if (command.indexOf(input) !== -1) {
        suggestions.push({
          content : command,
          description : browser.i18n.getMessage('omnibox_command_' + command)
        });
      }

      if (suggestions.length === 0) {
        suggestions.push({
          content : 'settings',
          description : browser.i18n.getMessage('omnibox_command_settings')
        });
      }
    }

    suggest(suggestions);
  },

  /**
   * Fired when the user has selected one of the suggestions the add-on has added to the address bar's drop-down list.
   *
   * @param {string} input - this is the value that the user selected
   *
   * @returns {void}
   */
  callOmniboxAction (input) {
    switch (input) {
      case 'settings':
      default:
        newtaboverride.openUserInterfaceInCurrentTab();
    }
  },

  /**
   * Fired when the toolbar icon is clicked. This method is used to open the user interface in a new tab or to switch
   * to the tab with the user interface if the user interface is already opened.
   *
   * @returns {void}
   */
  openUserInterface () {
    const url = browser.runtime.getURL(OPTIONS_PAGE);

    browser.browserAction.setBadgeText({ text : '' });
    browser.tabs.query({}, (tabs) => {
      let tabId = null;

      for (const tab of tabs) {
        if (tab.url === url) {
          tabId = tab.id;
          break;
        }
      }

      // there is already a tab open
      if (tabId) {
        browser.tabs.update(tabId, { active : true });
      }
      // open a new tab
      else {
        browser.tabs.create({ url });
      }
    });
  },

  /**
   * This method is used to open the user interface in the current tab. It's used for the omnibox suggestions.
   *
   * @returns {void}
   */
  openUserInterfaceInCurrentTab () {
    browser.tabs.update(null, { url : browser.extension.getURL(OPTIONS_PAGE) });
  }
};

browser.browserAction.onClicked.addListener(newtaboverride.openUserInterface);
browser.omnibox.onInputChanged.addListener(newtaboverride.showOmniboxSuggestions);
browser.omnibox.onInputEntered.addListener(newtaboverride.callOmniboxAction);
browser.omnibox.setDefaultSuggestion({ description : browser.i18n.getMessage('extension_description') });
browser.runtime.onInstalled.addListener(newtaboverride.onInstalledHandler);

browser.menus.create({
  title : browser.i18n.getMessage('settings_title'),
  contexts : ['tools_menu'],
  command : '_execute_browser_action'
});
