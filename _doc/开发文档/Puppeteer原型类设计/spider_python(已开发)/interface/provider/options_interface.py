from abc import ABC, abstractmethod
from typing import List, Dict

class OptionsInterface(ABC):

    @abstractmethod
    def get_base_dir(self, file: str = None) -> str:
        """Get the base directory, optionally joined with the provided file path."""
        pass

    @abstractmethod
    def get_library(self, file: str = None) -> str:
        """Get the library directory, optionally joined with the provided file path."""
        pass

    @abstractmethod
    def init_config(self) -> Dict[str, any]:
        """Initialize default configuration settings."""
        pass

    @abstractmethod
    def ini_options(self, options: Dict[str, any], width: int, height: int, headless: bool = False, disable_gpu: bool = False) -> Dict[str, any]:
        """Initialize and modify browser options."""
        pass

    @abstractmethod
    def get_pc_user_agent(self) -> str:
        """Return a user agent string for PC."""
        pass

    @abstractmethod
    def get_mobile_user_agent(self) -> str:
        """Return a user agent string for mobile."""
        pass
