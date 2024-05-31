package com.workingblerge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class SimpleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SimpleModule"
    }

    @ReactMethod
    fun getGreeting(name: String, callback: Callback) {
        val greeting = "Hellow, $name!"
        callback.invoke(greeting)
    }
}
