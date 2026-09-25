# Direct Sales App

A mobile-style React and TypeScript front end for managing a direct sales operation: products, depots, orders, payments, deliveries and users. It is an early prototype with no backend; data is kept in the browser's `localStorage`.

> Work in progress, last updated in 2022. Only the Product screen has working create/edit/delete; the other modules are placeholder panels with data models defined in TypeScript.

## Features

- Bottom tab navigation (Home, Checkout, Book, Settings) and slide-in panels for drill-down screens
- Generic list and detail panels (`ListPanel`, `DetailPanel`) driven by a form-field configuration
- Product management: list, create, edit, multi-select delete
- Form handling with required-field validation, numeric input formatting (Cleave.js) and lookup fields
- Per-entity CRUD store in `localStorage` (`useFetch`)
- TypeScript models for orders (with status workflow), order items, payments, deliveries, depots, users and product prices
- Custom virtualized grid/list components under `src/grid`

## Tech stack

React 18 · TypeScript · Create React App (react-scripts 5) · react-hook-useobserver · react-transition-group · Cleave.js · react-icons

## Getting started

```bash
npm install
npm start       # development server
npm run build   # production build into build/
```

There is no working test script; `jest.config.js` is present but references setup files that are not in the repository.

## Project layout

```
src/
  index.tsx          entry point
  grid/              Grid, Sheet and List components
  layout/            layout primitives, useForm, useSlidePanel
  modules/
    App.tsx          tab navigation and panel context
    component/       shared UI pieces (inputs, lookup, headers)
    page/            generic ListPanel, DetailPanel, useFetch store
    home/            tab screens
    order/ product/ payment/ delivery/ depo/ user/ history/
                     entity models and module panels
```
