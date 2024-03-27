from abc import ABC, abstractmethod

class ContentInterface(ABC):

    @abstractmethod
    def __init__(self):
        """Constructor for the ContentInterface."""
        pass

    @abstractmethod
    def init(self, browser):
        """Initializes the interface with the browser instance."""
        pass

    @abstractmethod
    def get_full_page_outer_html_and_wait(self):
        """Retrieves the entire outerHTML of the web page and waits if the page is not yet loaded."""
        pass

    @abstractmethod
    def get_full_page_outer_html(self):
        """Retrieves the entire outerHTML of the web page as a string."""
        pass

    @abstractmethod
    def get_all_anchor_hrefs(self, completeURL=False):
        """
        Retrieves all href values from anchor (<a>) tags and returns them as an array.
        If completeURL is true, returns full URLs.
        """
        pass

    @abstractmethod
    def get_all_image_srcs(self, completeURL=False):
        """
        Retrieves all src values from image (<img>) tags and returns them as an array.
        If completeURL is true, returns full URLs.
        """
        pass

    @abstractmethod
    def get_all_css_resource_paths(self, completeURL=False):
        """
        Retrieves resource paths from all <link rel="stylesheet"> tags and returns them as an array.
        If completeURL is true, returns full URLs.
        """
        pass

    @abstractmethod
    def get_all_js_resource_paths(self, completeURL=False):
        """
        Retrieves src values from all <script> tags and returns them as an array.
        If completeURL is true, returns full URLs.
        """
        pass

    @abstractmethod
    def query_all_elements(self, selector):
        """Retrieves all elements matching the given selector and returns them as an array."""
        pass

    @abstractmethod
    def does_element_exist(self, selector):
        """Determines if an element matching the given selector exists."""
        pass

    @abstractmethod
    def is_image_element(self, selector):
        """Determines if an element matching the given selector is an image (<img>) element."""
        pass

    @abstractmethod
    def is_anchor_element(self, selector):
        """Determines if an element matching the given selector is an anchor (<a>) element."""
        pass

    @abstractmethod
    def is_js_element(self, selector):
        """Determines if an element matching the given selector is a JavaScript (<script>) element."""
        pass

    @abstractmethod
    def is_css_element(self, selector):
        """Determines if an element matching the given selector is a CSS (<link rel="stylesheet">) element."""
        pass

    @abstractmethod
    def get_element_by_selector(self, selector):
        """Retrieves a single element matching the given selector."""
        pass

    @abstractmethod
    def get_element_by_selector_and_wait(self, selector, waitDuration=50000):
        """
        Retrieves a single element matching the selector and waits up to the specified duration if not found.
        Default duration is 50 seconds.
        """
        pass

    @abstractmethod
    def get_elements_by_selector_and_wait(self, selector, waitDuration=50000):
        """
        Retrieves all elements matching the selector and waits up to the specified duration if none are found.
        Default duration is 50 seconds.
        """
        pass

    @abstractmethod
    def get_text_by_selector(self, selector):
        """Retrieves the text content of a single element matching the selector."""
        pass

    @abstractmethod
    def get_all_texts_by_selector(self, selector):
        """Retrieves text content from all elements matching the selector and returns them as an array."""
        pass

    @abstractmethod
    def get_html_by_selector(self, selector):
        """Retrieves the innerHTML content of an element matching the selector."""
        pass

    @abstractmethod
    def get_text_by_selector_and_wait(self, selector, waitDuration=50000):
        """
        Retrieves the text content of an element matching the selector and waits up to the specified duration if not found.
        Default duration is 50 seconds.
        """
        pass

    @abstractmethod
    def get_html_by_selector_and_wait(self, selector, waitDuration=50000):
        """
        Retrieves the innerHTML content of an element matching the selector and waits up to the specified duration if not found.
        Default duration is 50 seconds.
        """
        pass

    @abstractmethod
    def get_elements_by_tag(self, tag):
        """Retrieves all elements with the given tag name."""
        pass

    @abstractmethod
    def get_element_by_xpath(self, xpath):
        """Retrieves a single element based on the given XPath."""
        pass

    @abstractmethod
    def get_sibling_before_text(self, selector, n=0):
        """
        Retrieves the text of the nth previous sibling element of the element matching the given selector.
        If none found, returns an empty string.
        """
        pass

    @abstractmethod
    def get_sibling_after_text(self, selector, n=0):
        """
        Retrieves the text of the nth next sibling element of the element matching the given selector.
        If none found, returns an empty string.
        """
        pass

    @abstractmethod
    def get_data_attribute_by_selector(self, selector):
        """Retrieves the data attribute value of a single element matching the selector."""
        pass

    @abstractmethod
    def get_all_data_attributes_by_selector(self, selector):
        """Retrieves the data attribute values from all elements matching the selector and returns them as an array."""
        pass

    @abstractmethod
    def count_elements_by_selector(self, selector):
        """Counts the number of elements matching the given selector."""
        pass

    @abstractmethod
    def get_text_by_selector_and_index(self, selector, index=0):
        """Retrieves the text content of the element at the specified index matching the selector."""
        pass

    @abstractmethod
    def get_html_by_selector_and_index(self, selector, index=0):
        """Retrieves the innerHTML of the element at the specified index matching the selector."""
        pass

    @abstractmethod
    def get_data_by_selector_and_index(self, selector, index=0):
        """Retrieves the data attribute value of the element at the specified index matching the selector."""
        pass

    @abstractmethod
    def get_value_by_selector_and_index(self, selector, index=0):
        """Retrieves the value attribute of the element at the specified index matching the selector."""
        pass

    @abstractmethod
    def replace_class_by_selector(self, selector, newClass):
        """Replaces the class of the element matching the given selector with the provided new class."""
        pass

    @abstractmethod
    def add_class_by_selector(self, selector, newClass):
        """Adds the provided class to the element matching the given selector."""
        pass

    @abstractmethod
    def remove_class_by_selector(self, selector, className):
        """Removes the provided class from the element matching the given selector."""
        pass

    @abstractmethod
    def set_style_by_selector(self, selector, style):
        """Sets the style of the element matching the given selector."""
        pass

    @abstractmethod
    def get_element_by_text(self, text):
        """Retrieves an element based on its text content."""
        pass

    @abstractmethod
    def get_browser_log_values(self):
        """Retrieves log values from the browser console."""
        pass

    @abstractmethod
    def wait_for_element(self, selector):
        """Waits until an element matching the given selector appears in the DOM."""
        pass

    @abstractmethod
    def get_height_by_selector(self, selector):
        """Retrieves the height of the element matching the given selector."""
        pass

    @abstractmethod
    def get_width_by_selector(self, selector):
        """Retrieves the width of the element matching the given selector."""
        pass

    @abstractmethod
    def find_ips_in_html(self):
        """Searches for IP addresses within the HTML content and returns them as an array."""
        pass

    @abstractmethod
    def get_last_ip_in_html(self):
        """Searches for IP addresses within the HTML content and returns the last found IP."""
        pass

    @abstractmethod
    def search_content_in_full_html(self, content):
        """Searches for the provided content in the full outerHTML and returns the matched content."""
        pass

    def __str__(self):
        """Return the string representation of the class."""
        return '[class ContentInterface]'
