from abc import ABC, abstractmethod

class HandleInterface(ABC):

    @abstractmethod
    def init(self, browser):
        """Initializes the browser environment."""
        pass

    @abstractmethod
    def execute_js_code(self, js_code):
        """Executes the provided JavaScript code and returns the result."""
        pass

    @abstractmethod
    def trigger_by_selector(self, selector, action='click'):
        """Triggers a specified action (default is click) on an element found by the provided selector."""
        pass

    @abstractmethod
    def load_js_file_local(self, file_path):
        """Loads and executes a local JavaScript file specified by the given path."""
        pass

    @abstractmethod
    def load_js_file_remote(self, url):
        """Loads and executes a remote JavaScript file from the provided URL."""
        pass

    def load_js_file(self, source):
        """Determines whether the source is local or remote and loads the JavaScript file accordingly."""
        if source.startswith('http://') or source.startswith('https://'):
            self.load_js_file_remote(source)
        else:
            self.load_js_file_local(source)

    @abstractmethod
    def execute_js_code_and_return(self, js_code):
        """Executes the provided JavaScript code and returns its result."""
        pass

    @abstractmethod
    def execute_js_code_and_wait(self, js_code):
        """Executes the provided JavaScript code and waits for it to complete."""
        pass

    @abstractmethod
    def set_input_by_selector(self, selector, value):
        """Finds an input element by the selector and sets its value."""
        pass

    @abstractmethod
    def set_select_value_by_selector(self, selector, value_or_index):
        """Finds a select element by the selector and sets its value or selects an option by index."""
        pass

    @abstractmethod
    def set_checkbox_value_by_selector(self, selector, value_or_index):
        """Finds a checkbox element by the selector and checks/unchecks based on the value or index provided."""
        pass

    @abstractmethod
    def set_radio_value_by_selector(self, selector, value_or_index):
        """Finds a radio element by the selector and selects the option based on the value or index provided."""
        pass

    @abstractmethod
    def set_element_value_by_selector(self, selector, value_or_index):
        """Finds an element by the selector and, depending on its type, sets its value accordingly."""
        pass

    @abstractmethod
    def get_select_value_by_selector(self, selector):
        """Retrieves the selected value or option from a select element found by the selector."""
        pass

    @abstractmethod
    def get_checkbox_value_by_selector(self, selector):
        """Determines if the checkbox found by the selector is checked or unchecked."""
        pass

    @abstractmethod
    def get_radio_value_by_selector(self, selector):
        """Retrieves the value of the selected radio option found by the selector."""
        pass

    @abstractmethod
    def get_element_value_by_selector(self, selector):
        """Retrieves the value of an element found by the selector, depending on its type."""
        pass

    @abstractmethod
    def get_coordinates_by_selector(self, selector):
        """Retrieves the X and Y coordinates of an element found by the selector."""
        pass

    @abstractmethod
    def execute_js_if_element_exists(self, selector, js_code):
        """Executes the provided JavaScript code if an element matching the selector is found."""
        pass

    @abstractmethod
    def set_focus_by_selector(self, selector):
        """Sets focus on an element found by the selector."""
        pass

    @abstractmethod
    def click_element_by_selector(self, selector):
        """Simulates a click action on an element found by the selector."""
        pass

    @abstractmethod
    def remove_element_by_selector(self, selector):
        """Removes the element found by the selector from the DOM."""
        pass

    @abstractmethod
    def set_inner_html_by_selector(self, selector, html):
        """Sets the innerHTML of the element found by the selector to the provided HTML string."""
        pass

    @abstractmethod
    def insert_html_before_element_by_selector(self, selector, html):
        """Inserts the provided HTML string before the element found by the selector."""
        pass

    @abstractmethod
    def insert_html_after_element_by_selector(self, selector, html):
        """Inserts the provided HTML string after the element found by the selector."""
        pass

    @abstractmethod
    def insert_html_inside_element_by_selector(self, selector, html):
        """Inserts the provided HTML string inside the element found by the selector."""
        pass

    @abstractmethod
    def insert_html_inside_end_of_element_by_selector(self, selector, html):
        """Inserts the provided HTML string at the end inside the element found by the selector."""
        pass

    @abstractmethod
    def create_and_insert_html_element(self, html_string, target_selector='BODY', position='beforeend', js_to_execute=None):
        """Creates an HTML element from the provided string and inserts it at the specified position relative to the target element. Optionally executes provided JavaScript after insertion."""
        pass

    @abstractmethod
    def get_scroll_height_by_selector(self, selector):
        """Retrieves the scroll height of an element found by the selector."""
        pass

    @abstractmethod
    def scroll_to_position_by_selector(self, selector, position='top'):
        """Scrolls the element found by the selector to the specified position (top by default)."""
        pass

    @abstractmethod
    def scroll_to_bottom_by_selector(self, selector):
        """Scrolls the element found by the selector to the bottom."""
        pass

    @abstractmethod
    def horizontal_swipe_by_selector(self, selector, length, direction='right'):
        """Simulates a horizontal swipe on the element found by the selector for the given length in the specified direction (right by default)."""
        pass

    @abstractmethod
    def vertical_swipe_by_selector(self, selector, length, direction='down'):
        """Simulates a vertical swipe on the element found by the selector for the given length in the specified direction (down by default)."""
        pass


    def __str__(self):
        """Returns a string representation of the HandleInterface class."""
        return '[class HandleInterface]'

