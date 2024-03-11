from abc import ABC, abstractmethod

class SourceInterface(ABC):

    @abstractmethod
    def get_driver_path_by_chrome(self):
        """You have to implement the method get_driver_path_by_chrome!"""
        pass

    def __str__(self):
        return "[class SourceInterface]"
