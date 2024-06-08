import { render, screen } from "@testing-library/react"
import Contact from "../Contact"
import '@testing-library/jest-dom'

describe("Contact Us test cases",() =>{
    it("should load contact us component",()=>{
        render(<Contact />);
        const heading = screen.getByRole("heading");
    
        expect(heading).toBeInTheDocument();
    });
    
    it("should load button in contact us component",()=>{
        render(<Contact />);
        const button = screen.getByRole("button");
    
        expect(button).toBeInTheDocument();
    });
    
    it("should load input in contact us component",()=>{
        render(<Contact />);
        const message = screen.getByPlaceholderText("message");
    
        expect(message).toBeInTheDocument();
    });
    
    it("should load two inputs in contact us component",()=>{
        render(<Contact />);
        const inputs = screen.getAllByRole("textbox");
    
        expect(inputs.length).toBe(2);
    });
});

