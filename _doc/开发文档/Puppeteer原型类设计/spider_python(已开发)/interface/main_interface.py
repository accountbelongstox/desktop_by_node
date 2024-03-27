from abc import ABC, abstractmethod

class IBrowser(ABC):

    @abstractmethod
    def create_driver(self, options: dict) -> "Driver":
        """Create a driver with given options."""
        pass

    @abstractmethod
    def create_platform_driver(self) -> "Driver":
        """Create a driver based on the platform."""
        pass

    @abstractmethod
    def init(self, args: str) -> None:
        """Initialize the driver."""
        pass

    @abstractmethod
    def is_ready(self) -> bool:
        """Check if the driver is ready."""
        pass

    @abstractmethod
    def open_ready_wait(self) -> bool:
        """Wait until the page is ready."""
        pass

    @abstractmethod
    def open_local_html_to_beautiful_soup(self, html_name: str) -> "BeautifulSoup":
        """Load a local HTML file and parse it with BeautifulSoup."""
        pass

    @abstractmethod
    def is_exists_driver(self) -> bool:
        """Check if the driver exists."""
        pass

    @abstractmethod
    def get_driver(self) -> "Driver":
        """Get the current driver."""
        pass

    @abstractmethod
    def get_window_position(self) -> dict:
        """Get the position of the current window."""
        pass

    @abstractmethod
    def get_windows_registry_value(self, key_path: str, value_name: str) -> str:
        """Get a value from the Windows registry."""
        pass

    @abstractmethod
    def set_driver(self, driver: "Driver") -> "Driver":
        """Set the current driver."""
        pass

    @abstractmethod
    def test_bot(self, driver_type: str) -> None:
        """Test if the driver is detected as a bot on a given site."""
        pass

    @abstractmethod
    def sleep(self, milliseconds: int) -> None:
        """Pause execution for a given number of milliseconds."""
        pass

    @abstractmethod
    def wait_element(self, selector: str, timeout: int, deep: int) -> bool:
        """Wait for an element to be present in the DOM."""
        pass

    @abstractmethod
    def is_show(self, selector: str) -> bool:
        """Check if an element is visible in the DOM."""
        pass

    @abstractmethod
    def is_complete(self, src: str, wait: int) -> bool:
        """Check if a given element with the source has completed loading."""
        pass

