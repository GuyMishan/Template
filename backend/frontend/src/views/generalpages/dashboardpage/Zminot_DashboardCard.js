import React, { useState, useEffect, useRef } from 'react';

import { Link, withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Container,
    Col,
    Collapse,
} from "reactstrap";

function Zminot_DashboardCard(props) {

    return (
        <Card style={{ boxShadow: 'rgb(123 123 123 / 20%) 0px 2px 5px 5px' }}>
            <CardHeader>
                <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>אחוז זמינות ביחידה</h3>
            </CardHeader>
            <CardBody style={{ textAlign: 'center', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', margin: '0px', color: '#4f75d5' }}>30%</h2>
            </CardBody>
            <CardFooter/>
        </Card>
    );
}

export default withRouter(Zminot_DashboardCard);