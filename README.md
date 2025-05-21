FRM Registro Visitantes
====================

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation using Docker
It's required: 

* [Docker +20](https://www.docker.com/)
* [Docker compose +2.5.1](https://docs.docker.com/compose/install/other/)
* This project uses Node 22.11.0
* This project uses React 19 and NextJS 15.2


Steps:

1. Ensure port 3000 is not running other service.
1. run `cd {your project folder}`
1. run `sudo docker-compose build --no-cache`
1. run `sudo docker-compose up`
1. Finally, go to [localhost:3000](http://localhost:3000)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Brand Colors

This project uses [Material UI](https://mui.com/material-ui/customization/how-to-customize/).

You can edit the theme values in the file: `/src/providers/MuiProvider/theme.ts`

## Intl

This is pattern used to naming the TEXTS ids. ´{ComponentName}.{HtmlTag or ComponentName or *Key*Message}.[{HtmlTag}].{UpperCaseSignificantDescription}´

Examples: 
- <b>CardVisitor.Button.SubmitFormSearchVisitor</b>
- <b>CounterTextField.Typography.P.CounterMessage</b>