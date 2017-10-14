# SportEvent2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### APIs calling 

By default development will listen to `http://sportevent.local/`. 

Prefix api/v1 is also added to all ports.


## Production server / Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### APIs calling 

By Default production will listen to http://mc-sportevent-api.junaidahmed.online/.

Prefix api/v1 is also added to all ports.

## API REPO 

https://github.com/junahmed46/SPORTS-EVENT.git

Detail related APIs are mentioned 

https://github.com/junahmed46/SPORTS-EVENT/blob/master/apiary.apib

or 

http://docs.sporteventmooncasecade.apiary.io/#

## NOTE

1. In order to run Auto Play API server must run `php artisan queue:listen` [Laravel Queues](https://laravel.com/docs/5.4/queues)
2. Manual play is just a copy of Auto Play, kindly ignore duplication of functions etc i did't handle it using parents
3. In Manual function Layout might be not the same i mean user i might need to scroll a little bit that is due to Atletes on left side and few buttons on the Top

## Running unit tests
Right Now there is no test done but will be added if required.

