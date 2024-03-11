from abc import ABC, abstractmethod

class PageInterface(ABC):

    @abstractmethod
    def init(self, browser):
        """Initialize browser"""
        pass

    @abstractmethod
    def create_page(self, conf=None):
        """Create a page"""
        pass

    @abstractmethod
    def open(self, url, options=None):
        """Open a URL"""
        pass

    @abstractmethod
    def set_user_agent(self, user_agent, index=0):
        """Set user agent"""
        pass

    @abstractmethod
    def switch(self, url_or_index):
        """Switch to the specified URL or index page"""
        pass

    @abstractmethod
    def get_current_page_index(self):
        """Get the current page index"""
        pass

    @abstractmethod
    def get_current_page_url(self):
        """Get the current page URL"""
        pass

    @abstractmethod
    def switch_to_page_by_index(self, index):
        """Switch to page by index"""
        pass

    @abstractmethod
    def switch_to_page_by_url(self, url):
        """Switch to page by URL"""
        pass

    @abstractmethod
    def get_page_by_index(self, index):
        """Get page by index"""
        pass

    @abstractmethod
    def close(self, handle=None):
        """Close the page related to the handle"""
        pass

    @abstractmethod
    def close_page(self, url=None, safe=True):
        """Close the page with the specified URL"""
        pass

    @abstractmethod
    def get_current_url(self, full=False):
        """Get the current URL"""
        pass

    @abstractmethod
    def get_pages_len(self):
        """Get the number of pages"""
        pass

    @abstractmethod
    def get_pages(self):
        """Get all pages"""
        pass

    @abstractmethod
    def find_page_index_by_url(self, url):
        """Find page index by URL"""
        pass

    @abstractmethod
    def close_page_by_index(self, index):
        """Close page by index"""
        pass

    @abstractmethod
    def close_page_by_url(self, url):
        """Close page by URL"""
        pass

    @abstractmethod
    def close_browser_window(self):
        """Close browser window"""
        pass

    @abstractmethod
    def quit_browser(self):
        """Quit the browser"""
        pass

    @abstractmethod
    def find_blank_page_index(self):
        """Find the index of the blank page"""
        pass

    @abstractmethod
    def find_normalized_url_index(self, url):
        """Find index of normalized URL"""
        pass

    @abstractmethod
    def switch_only(self, url):
        """Switch only to the specified URL page"""
        pass

    def __str__(self):
        """Return the string representation of the class"""
        return "[class PageInterface]"
