from abc import ABC, abstractmethod

class DownloadInterface(ABC):

    @abstractmethod
    def init(self, browser):
        """Initialize the browser."""
        pass

    @abstractmethod
    def get_default_download_path(self, browser):
        """Get the default download path based on the browser."""
        pass

    @abstractmethod
    def set_default_download_path(self, browser, path):
        """Set the default download path for the browser."""
        pass

    @abstractmethod
    def extract_file_name_from_url(self, url):
        """
        Extract a filename from a URL. Normally, it retrieves /xxx.filename. 
        If it's like /xxx/xxx/ it'll format the URL as a filename. 
        If it ends with special characters like ? or #, 
        it will format the value after the last slash as a usable filename.
        """
        pass

    @abstractmethod
    def get_download_file_name(self, url, specified_name=None):
        """
        Get a download filename. If a name is specified, return it; 
        otherwise, convert the input URL into a filename.
        """
        pass

    @abstractmethod
    def get_default_temp_download_path(self, config):
        """Get the default temporary download path from a configuration file."""
        pass

    @abstractmethod
    def download_link_resource(self, selector):
        """
        For an a-tag selector, download the corresponding href resource 
        and store in a designated download path.
        """
        pass

    @abstractmethod
    def save_image_from_selector(self, selector):
        """For an img-tag selector, read its binary data and save it to the default path."""
        pass

    @abstractmethod
    def save_audio_from_selector(self, selector):
        """For an audio-tag selector, read its resource binary data and save to the default path."""
        pass

    @abstractmethod
    def create_and_click_download_link(self, selector):
        """
        For a selector, create an a-tag with a _bank attribute. 
        After clicking, the resource will be available for download with the browser's default method. 
        The a-tag will have a unique ID value.
        """
        pass

    def __str__(self):
        """Return the string representation of the class."""
        return '[class DownloadInterface]'
