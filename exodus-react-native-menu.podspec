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
  s.source       = { :git => "https://github.com/ExodusMovement/react-native-menu.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_OBJC_INTERFACE_HEADER_NAME' => 'exodus-react-native-menu-Swift.h',
    'SWIFT_OBJC_BRIDGING_HEADER' => '$(PODS_TARGET_SRCROOT)/ios/Menu-Bridging-Header.h',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17'
  }

  install_modules_dependencies(s)

  if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
    s.compiler_flags = '-DRCT_NEW_ARCH_ENABLED=1'
  end
end

