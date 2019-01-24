# Dark Binding

This application was built for [Riot Games' 2018 API Challenge](https://www.riotgames.com/en/DevRel/the-riot-games-api-challenge-2018).

Dark Binding allows you to define groups of keybindings to which you can assign individual champions. When you go into a game, Dark Binding will detect your champion and automatically switch to the keybinding page you defined, if any.

## Guide

Head over to the [releases](https://github.com/s-coimbra21/dark-binding-gui/releases) page and download the latest version for your operating system. Currently, Windows and Mac are supported, but only Windows binaries are provided by me.

After installing the application, open it in order to start defining your binding groups. Create a new group by clicking the "+ New Group" row, and delete or rename existing groups by right-clicking them. Edit keybindings and champion assignments by selecting (left-click) a group in order to open the editor view.

If you wish to add Dark Binding to your system startup, check your system tray while Dark Binding is open and select the "Run on startup" option.

## Screenshots

### Dashboard

![dashboard](https://i.imgur.com/ZusCXG1.png)

### Editor

![editor](https://i.imgur.com/njmJdSz.png)

## Development

### Requirements

- Windows or Mac OSX
- NodeJS
- Yarn

### Launching the app

```
git clone git@github.com:s-coimbra21/dark-binding-gui.git
cd dark-binding-gui
yarn install
yarn dev
```
