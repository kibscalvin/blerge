package com.workingblerge

import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceInfoModule"
    }

    @ReactMethod
    fun getDeviceName(callback: Callback) {
        val deviceName = "${Build.MANUFACTURER} ${Build.MODEL}"
        callback.invoke(deviceName)
    }

    @ReactMethod
    fun getOSVersion(callback: Callback) {
        val osVersion = Build.VERSION.RELEASE
        callback.invoke(osVersion)
    }
}
