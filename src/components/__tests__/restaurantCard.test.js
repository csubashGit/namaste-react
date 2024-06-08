import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import MOCK_Data from "../mocks/RestaurantCardMock.json";
import '@testing-library/jest-dom'

it("should render Restaurant card",() =>{
    render(<RestaurantCard resData= {MOCK_Data}/>);
    const name = screen.getByText("Leon's - Burgers & Wings (Leon Grill)");
    expect(name).toBeInTheDocument();
})