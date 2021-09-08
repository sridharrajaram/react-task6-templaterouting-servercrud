import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default function Sidebar(){
    return(
        /* <!-- Sidebar --> */
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/* <!-- Sidebar - Brand --> */}
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider my-0"/>

            {/* <!-- Nav Item - Dashboard --> */}
            <li class="nav-item active">
                <Link to="/" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"/>

            {/* <!-- Heading --> */}
            <div class="sidebar-heading">
                Interface
            </div>

            {/* <!-- Nav Item - Pages Collapse Menu --> */}
            <li class="nav-item">
                <Link to="/user" class="nav-link collapsed">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Users</span>
                </Link>
            </li>

            {/* <!-- Nav Item - Utilities Collapse Menu --> */}
            <li class="nav-item">
                <Link to="/product" class="nav-link collapsed">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Products</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr class="sidebar-divider"/>
        </ul>
        /* <!-- End of Sidebar --> */
    );
}