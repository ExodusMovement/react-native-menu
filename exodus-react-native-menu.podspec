require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "exodus-react-native-menu"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "13.4" }
  s.swift_versions = ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9']
  s.source       = { :http => "https://github.com/ExodusMovement/react-native-menu/archive/refs/tags/v#{s.version}.tar.gz", :sha256 => "13a22f07602e1cd1f29848fc6f6798f7eeaa6de5be3fec381382582ab5b903a6" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.exclude_files = "ios/Menu-Bridging-Header.h"

  s.dependency "React-Core"

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_OBJC_INTERFACE_HEADER_NAME' => 'exodus-react-native-menu-Swift.h',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17'
  }

  if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
    s.compiler_flags = '-DRCT_NEW_ARCH_ENABLED=1'
    s.dependency "React-RCTFabric"
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
  end
end

