import { NaryNode } from "./NaryNode";
import { NaryTree } from "./NaryTree";
import Home from "./Pages/Home";
import About from "./Pages/about";
import Services from "./Pages/Services";
import Web from "./Pages/Web";
import Mobile from "./Pages/Mobile";
import Cloud from "./Pages/Cloud";
import Contact from "./Pages/Contact";

const root = new NaryNode("Home", "/", Home);
const about = new NaryNode("About", "/about", About);
const services = new NaryNode("Services", "/services", Services);
const contact = new NaryNode("Contact", "/contact", Contact);

const web = new NaryNode("Web Development", "/services/web", Web);
const mobile = new NaryNode("Mobile Apps", "/services/mobile", Mobile);
const cloud = new NaryNode("Cloud Solutions", "/services/cloud", Cloud);

services.addChild(web);
services.addChild(mobile);
services.addChild(cloud);

root.addChild(about);
root.addChild(services);
root.addChild(contact);

export const menuTree = new NaryTree(root);
