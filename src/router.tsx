import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import MemberList from "./routes/members/MemberList";
import DetailMember from "./routes/members/DetailMember";
import OfferingList from "./routes/offerings/OfferingList";
import { PrivateRoute } from "./components/PrivateRoute";
import EditOffering from "./routes/offerings/EditOffering";
import CreateOffering from "./routes/offerings/CreateOffering";
import DetailOffering from "./routes/offerings/DetailOffering";
import OfferingMyDateRangeList from "./routes/offerings/OfferingMyDateRangeList";
import OfferingMyYearlyList from "./routes/offerings/OfferingMyYearlyList";
import OfferingMyMonthlyList from "./routes/offerings/OfferingMyMonthlyList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "MemberList",
                element: <PrivateRoute> <MemberList /></PrivateRoute>,
            },
            {
                path: "MemberList/:memberPk",
                element: <PrivateRoute> <DetailMember /></PrivateRoute>,
            },
            {
                path: "OfferingList",
                element: <PrivateRoute> <OfferingList /></PrivateRoute>,
            },
            {
                path: "OfferingList/:offeringPk",
                element: <PrivateRoute> <DetailOffering /></PrivateRoute>,
            },
            {
                path: "OfferingList/Create/", // create
                element: <PrivateRoute> <CreateOffering /></PrivateRoute>,
            },
            {
                path: "OfferingList/Edit/:offeringPk", //Edit
                element: <PrivateRoute> <EditOffering /></PrivateRoute>,
            },
            {
                path: "OfferingList/Range/:offeringNo",
                element: <PrivateRoute> <OfferingMyDateRangeList /></PrivateRoute>,
            },
            {
                path: "OfferingList/Month/:offeringNo",
                element: <PrivateRoute> <OfferingMyMonthlyList /></PrivateRoute>,
            },
            {
                path: "OfferingList/Year/:offeringNo",
                element: <PrivateRoute> <OfferingMyYearlyList /></PrivateRoute>,
            },
        ],
    },

]);


export default router;