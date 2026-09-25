# Direct Sales App

Direct Sales App is an early front-end prototype for running a direct sales business, where orders are taken from customers, assigned to a depot, delivered by a driver and paid for. It is a mobile-style React 18 and TypeScript app made with Create React App, built from May 2022 as a base for an admin and field app that would manage products, depots, orders, payments, deliveries and users in one place. The screens are built from a small set of generic parts. A `ListPanel` and a `DetailPanel` render a list and a form from a field configuration, panels slide in over the tab bar for drill-down, and a `useFetch` hook provides create, read, update and delete for each entity, stored as JSON in the browser's `localStorage`. There is no backend or login. The Product screen works end to end; the order, payment, delivery, depot and user modules so far have TypeScript data models, including a full order status workflow, and placeholder panels.

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

## Project structure

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

## How it works

- `src/modules/App.tsx` renders the bottom tab bar and provides an `AppContext` with `showPanel`, which slides a new panel in from the side and resolves when it closes.
- `HomePanel` opens a `ListPanel` for an entity (for example `Product`), passing the entity name, a cell renderer and a list of `formInputs` (field, label, and a config such as `text`, `numeral` or a validator).
- `ListPanel` reads records through `useFetch(entityName)` and opens `DetailPanel` to create or edit one. `DetailPanel` builds its form with `useForm` from the same `formInputs`.
- `useFetch` keeps each entity as an array in `localStorage` under the entity name, so data persists across reloads in the same browser only.
- Orders move through the statuses `REQUESTED`, `WAITING FOR DEPO`, `DEPO REJECT`, `WAITING FOR DELIVERY`, `ON DELIVERY`, `RETURNED TO DEPO`, `REJECTED BY USER`, `DELIVERED TO USER` and `CANCELLED`, as defined in `src/modules/order/Order.ts`. No screen uses this workflow yet.
