from abc import ABC, abstractmethod

class DriverInterface(ABC):

    @abstractmethod
    def bypass(self):
        """This method seems to be used for adding plugins or configurations before launching the browser."""
        pass

    @abstractmethod
    def document_initialised(self):
        """This method appears to check if the document has been initialized by checking the outerHTML of the document."""
        pass

    @abstractmethod
    def create_chrome_driver(self, options=None):
        """This method is responsible for creating and initializing a Chrome driver with given options."""
        pass

    @abstractmethod
    def load_jquery(self):
        """This method is intended to ensure that jQuery is loaded on the page."""
        pass

    @abstractmethod
    def load_jquery_wait(self, load_deep=0):
        """This method checks for jQuery's availability on the page with a certain depth of retries."""
        pass

    @abstractmethod
    def custom_browser(self):
        """This method seems to customize browser settings, particularly around content settings and plugins."""
        pass

    def __str__(self):
        return "[class DriverInterface]"
