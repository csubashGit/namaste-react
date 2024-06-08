import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Body from "../Body";
import MOCK_DATA from "../mocks/MockRestaurantList.json";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            return Promise.resolve(MOCK_DATA);
        }
    })
});

it("should render the body component",async()=>{
    await act(async ()=> render(
        <BrowserRouter>
        <Body/>
        </BrowserRouter>
    ))

    const searchInput = screen.getByTestId("searchInput")

    console.log(searchInput);
    
})