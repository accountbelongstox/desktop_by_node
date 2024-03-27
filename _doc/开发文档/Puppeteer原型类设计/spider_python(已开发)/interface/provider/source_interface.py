from abc import ABC, abstractmethod

class SourceInterface(ABC):
    
    @abstractmethod
    def set_config(self, conf):
        """设置配置信息."""
        pass

    @abstractmethod
    def get_driver_path_by_browser(self, driver_type: str) -> str:
        """根据给定的浏览器类型获取对应的驱动路径."""
        pass

    @abstractmethod
    def get_browser_path(self, browser: str) -> str:
        """根据浏览器类型获取浏览器路径."""
        pass

    @abstractmethod
    def get_browser_driver_path(self, driver_type: str) -> str:
        """获取浏览器驱动的路径."""
        pass

    @abstractmethod
    def get_edge_install_path(self) -> str:
        """获取Microsoft Edge的安装路径."""
        pass

    @abstractmethod
    def get_edge_version(self, edge_exe_path: str) -> str:
        """获取Microsoft Edge的版本."""
        pass

    @abstractmethod
    def get_chrome_path(self) -> str:
        """获取Chrome的路径."""
        pass

    @abstractmethod
    def download_chrome_binary(self) -> str:
        """下载Chrome浏览器二进制文件."""
        pass

    @abstractmethod
    def get_chrome_version(self) -> str:
        """获取Chrome的版本."""
        pass

    @abstractmethod
    def get_real_driver_version(self, driver_type: str) -> str:
        """Retrieve the real version of the driver."""
        pass

    @abstractmethod
    def get_supported_version(self, driver_type: str) -> list[str]:
        """Get the supported versions for a driver."""
        pass

    @abstractmethod
    def find_version(self, versions: list[str], target: str) -> str:
        """Find the closest version to the target."""
        pass

    @abstractmethod
    def binary_search(self, arr: list[int], target: int) -> int:
        """Binary search for a version."""
        pass

    @abstractmethod
    def is_supported_version(self, driver_type: str, version: str) -> bool:
        """Check if a version is supported."""
        pass

    @abstractmethod
    def install_driver(self, version: str, driver_type: str = 'chrome') -> str:
        """Install a driver."""
        pass

    @abstractmethod
    def down_driver(self, version: str, driver_type: str) -> str:
        """Download the driver."""
        pass

    @abstractmethod
    def download_and_extract(self, url: str, file_name: str) -> str:
        """Download and extract the driver."""
        pass

    @abstractmethod
    def get_driver_remote_url(self, driver_type: str) -> str:
        """Retrieve the driver's remote URL."""
        pass

    @abstractmethod
    def get_driver_support_url(self, driver_type: str) -> str:
        """Retrieve the driver's support URL."""
        pass

    @abstractmethod
    def get_driver_download_url(self, driver_type: str, version: str) -> str:
        """Retrieve the driver's download URL."""
        pass

    @abstractmethod
    def get_driver_from_down(self, download_url: str) -> str:
        """Download the driver."""
        pass

    @abstractmethod
    def get_driver_version(self, driver_type: str) -> str:
        """Retrieve the driver's version."""
        pass

    @abstractmethod
    def get_driver_path_name(self, driver_type: str) -> str:
        """Retrieve the driver's path name."""
        pass
