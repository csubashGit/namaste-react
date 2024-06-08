import { fireEvent, render,screen } from "@testing-library/react"
import Header from "../Header"
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom"
import '@testing-library/jest-dom'




it("should load component with Login button",()=>{
    render(
    <BrowserRouter>
    <Provider store={appStore}>
    render(<Header/>)
    </Provider>
    </BrowserRouter>
    );
    const loginButton = screen.getByRole("button",{name:"Login"});
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole("button",{name:"Logout"});
    expect(logoutButton).toBeInTheDocument();
});
it("cart items should be zero",()=>{
    render(
        <BrowserRouter>
        <Provider store={appStore}>
        render(<Header/>)
        </Provider>
        </BrowserRouter>
        );
        const cartItems = screen.getByText("Cart - (0)");
        expect(cartItems).toBeInTheDocument();
})