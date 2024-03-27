from abc import ABC, abstractmethod

class UtilInterface(ABC):

    @abstractmethod
    def is_windows(self) -> bool:
        """Check if the current platform is Windows."""
        pass

    @abstractmethod
    def is_dynamic_url(self, url: str) -> bool:
        """Determine if a URL is dynamic based on query parameters."""
        pass

    @abstractmethod
    def kill_chrome_command(self) -> str:
        """Get the command to kill Chrome processes."""
        pass

    @abstractmethod
    def deep_update(self, target: dict, source: dict) -> dict:
        """Deep update a target dictionary with a source dictionary."""
        pass

    @abstractmethod
    def print_keys(self, obj: dict, depth: int = 0, max_depth: int = 10) -> None:
        """Print the keys of a dictionary with indentation based on depth."""
        pass

    @abstractmethod
    def contains_any_key(self, obj: dict, target_keys: list[str]) -> bool:
        """Determine if a dictionary contains any of the target keys."""
        pass

    @abstractmethod
    def normalize_url(self, url: str) -> str:
        """Normalize a URL by removing the scheme and query parameters."""
        pass
