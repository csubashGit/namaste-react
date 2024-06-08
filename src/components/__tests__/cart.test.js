import { fireEvent, render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResMenu.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import RestaurantMenu from "../RestaurantMenu";
import appStore from "../../utils/appStore";
import Header from "../Header";
import Cart from "../Cart";


global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            return Promise.resolve(MOCK_DATA);
        }
    })
});

it("should load Restaurant Menu Component",async ()=>{
    await act(async ()=> render(
        <BrowserRouter>
        <Provider store={appStore}>
            <RestaurantMenu/>
            <Header/>
        </Provider>
        </BrowserRouter>
    ));
    const accordianHeader = screen.getByText("Biryani (5)");
    fireEvent.click(accordianHeader);
    expect(screen.getAllByTestId("foodItems").length).toBe(5);

    const addBtn = screen.getByRole("button",{name:"Add +"});
    fireEvent.click(addBtn[0]);
    expect(screen.getByText("Cart - 1")).toBeInTheDocument();
    expect(screen.getAllByTestId("foodItems").length).toBe(7);
    const clearButton = screen.getByRole("button",{name:"Clear Cart"});
    fireEvent.click(clearButton);
    expect(screen.getAllByTestId("foodItems").length).toBe(5);
    expect(screen.getByText("Cart is empty. Add Items to the cart!")).toBeInTheDocument();
});