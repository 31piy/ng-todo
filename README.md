# TODO List

This project is a simple TODO list created using Angular and Angular Material
libraries. The entire list is saved into the browser's local storage.

# Features

## Adding items
Simply use the textbox, and type in your TODO item name and press Enter. It will
add that item to the list below.

## Changing priority
Once the item is in the list, hover on it, and click on the "Exclamation Sign"
button to toggle the priority between "low" and "high". The default priority
is "low" for every new item added to the list.

## Marking items as done/undone

Hover on an item in the list, and click on the "Tick Mark" button to toggle
done/undone state. A done item is shown in a slightly off color.

## Selecting items

An item in the list can be selected/deselected by toggling on/off the checkbox
on the item. If an item is selected, it's background color is changed to
highlight this fact.

## Deleting items

Hover on an item in the list, and click on the "Trash" button to delete it from
the list. You can also select multiple items and press <kbd>Delete</kbd> on
your keyboard to delete those.

## Editing items

An item's title can be changed by double clicking on it. When a double click
is performed, the item's title transforms into a text input. You can edit the
title and press <kbd>Enter</kbd> to save it, or <kbd>Escape</kbd> to cancel
edits.

## Keyboard navigation

For keyboard navigation to work, you need to click on the empty area on the
document. The use <kbd>Up Arrow</kbd> or <kbd>Down Arrow</kbd> to move focus
among the items and press <kbd>Space</kbd> to toggle item selection.

# How to run?

## Pre-requisites

Please ensure you have the followings already installed on your system.

1. NodeJS v14+ (with NPM)
1. Git

## Setting up Project

1. Clone the repository

```bash
git clone https://github.com/31piy/ng-todo.git
```

2. Install Dependencies

```bash
npm install
```

3. Start the local server

```bash
npm start
```

## Running Unit Tests

_The unit tests are run using Karma and require a Chrome binary to be installed
on the system._

```bash
npm test
```

## Building for production

The following command will generate production assets, and will put those inside
the `dist` folder.

```bash
npm run build -- --prod
```

# Future work

- [ ] Arrange items by their priority.
- [ ] Ability to re-arrange the items using drag-n-drop.
- [ ] Keyboard shortcuts.
