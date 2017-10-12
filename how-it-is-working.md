#How it will work

## Events Page
From The Event page you can go to detail of any previous event or you can create new one

## Event Detail
In Event detail page all the athletes are listed of current event, in case of **newly added** event there will be option to add 10 to 15
random athlets. 
you can play manual from here or you can play automatic 

## Play Automatic 
once open first dummy records will be **inserted in Queue** for all athletes in the events, if the event in previously opened or data inserted
manual play no new data will inserted. 
Once data inserted then Observable is there to listen. once there is data it will start displaying 
php artisan queue:listen is important here. 

1. Page do have option to see next and previous step 
2. Page do have option to see time or time differnece 
3. Page stop fetching if browser in inactive 
4. Page display record in such a way that it will never throw all data even if browser activated after hours 

## Play Manual 
In case of Play manual, data can be insert via the button so user is able to check by making moves. The Play manual ***do have option to delete pevious data***
so you can test it again. 

1. Page do have option to see next and previous step 
2. Page do have option to see time or time differnece 
3. Page stop fetching if browser in inactive 
4. Page display record in such a way that it will never throw all data even if browser activated after hours 


Note: If you play automatically first then data will be inserted and manual will use same data same is the case if you play manual first and there will be 
data for automatic. Only differnece is if you played half finish manual and then autoamtic then ***Automatic will add missing data*** but time differnece 
will be actual. Like you played manually a day ago with half finish and playing automatic today then there will be Gap of One day between records 
