// Application routes

import DummyServiceRoutes from 'app/services/dummy/routes';
import express from 'express';
import TrainingServiceRoutes from 'app/services/training/routes/training';
import WebinarServiceRoutes from 'app/services/training/routes/webinar';
import UsersServiceRoutes from 'app/services/training/routes/common';
import AuthServiceRoutes from 'app/services/auth/routes';
import ValidAuthTokenMiddleware from 'app/global/middlewares/ValidAuthToken';
import DefaultServiceRoutes from 'app/services/default/routes';


let routes = function(app) {

    app.use('/uploads', express.static('uploads'));
    // user auth login routes
    app.use('/auth', AuthServiceRoutes);
    // user service routes
    app.use('/users',ValidAuthTokenMiddleware, UsersServiceRoutes);
    // user training routes
    app.use('/training', ValidAuthTokenMiddleware, TrainingServiceRoutes);
    app.use('/webinar', ValidAuthTokenMiddleware, WebinarServiceRoutes);
    //  app.use( '/payments', ValidAuthTokenMiddleware, PaymentServiceRoutes );
    //  app.use( '/bookings', ValidAuthTokenMiddleware, BookingServiceRoutes );
    //  app.use( '/hosts', ValidAuthTokenMiddleware, HostsServiceRoutes );
    //  app.use( '/messages', ValidAuthTokenMiddleware, MessageServiceRoutes );
    //  app.use( '/dealmaker', ValidAuthTokenMiddleware, DealmakerServiceRoutes );
    //  app.use( '/dummy', DummyServiceRoutes );
    app.use('/', DefaultServiceRoutes);
}

export default routes;
