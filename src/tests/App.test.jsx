import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import App from "../components/App";

describe('App Component', () => {

    let container // Defining the container
    // Rendering the App, then directly accessing the 'container' (so we don't need to destructure it in each test), before each test
    beforeEach(() => {
        container = render(<App />).container
    })

    // If we see the text 'Journal Entries' then we know that the Home ('/') component has rendered properly, and hence 'App' as well as the first thing rendered is the Home page
    it('Renders the Home component', () => {
        // Then we can write the tests that will help us establish if this has been successful
        expect(container.querySelector('h5')).toHaveTextContent('Journal Entries')
    })

    it('Renders the CategoriesSelection Component when Entry menu item is clicked', async () => {
        // Then we specifically target the user click on the menu item (Create Entry in this case) 
        await userEvent.click(screen.getByText('Create Entry'))
        // Then advise that we expect the heading of the page to be not null
        expect(container.querySelector('h3')).not.toBeNull()
        // And we expect the h3 heading to have specific text (it's unique ot that page)
        expect(container.querySelector('h3')).toHaveTextContent('Please select a category:')
    })
})