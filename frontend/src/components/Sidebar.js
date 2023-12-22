import "./Sidebar.css";
import { useDispatch } from "react-redux";

import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { routes } from "../constants/routeConstant";
import logo from "../images/logo-scholly.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    dispatch(logout());
  };

  function renderRoutes() {
    return routes.map((route, index) => {
      if (route.collapse) {
        return (
          <AccordionItem className="py-2">
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <div key={index} className="text-sm font-bold">
                    <i className={`mx-3 ${route.icon}`} aria-hidden="true"></i>
                    {route.name}
                  </div>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {route.paths.map((sub, index) => (
                <Link className="linked" to={sub.path} key={index}>
                  <div
                    className="ml-2 py-3 px-2 text-sm duration-200 hover:bg-gray-100 cursor-pointer font-bold outline-none"
                    onClick={onClose}
                  >
                    <i className={`${sub.icon} mr-3`} aria-hidden="true"></i>
                    {sub.name}
                  </div>
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        );
      } else {
        return (
          <Link
            to={route.path}
            key={index}
            className="linked py-3 text-sm duration-200 hover:bg-gray-100 cursor-pointer font-bold flex items-center outline-none"
            onClick={route.name === "Log Out" ? () => logoutHandler() : onClose}
          >
            <i className={`mx-3 ${route.icon}`} aria-hidden="true"></i>

            <div to={route.path}>{route.name}</div>
          </Link>
        );
      }
    });
  }

  return (
    <div className="">
      <i
        className="fa fa-bars cursor-pointer fa-lg"
        aria-hidden="true"
        onClick={onOpen}
      ></i>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            className="flex justify-between"
          >
            <div className="flex items-center ml-2">
              <img src={logo} alt="logo" className="w-9 h-9 mr-4" />
              <h1 className="font-bold text-xl">Scholly</h1>
            </div>
            <i
              className="fa fa-times cursor-pointer fa-sm"
              aria-hidden="true"
              onClick={onClose}
            ></i>
          </DrawerHeader>
          <DrawerBody>
            <Accordion allowToggle>{renderRoutes()}</Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
