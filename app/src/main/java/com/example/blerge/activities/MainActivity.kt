package com.example.blerge.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.example.blerge.R
import com.example.blerge.adapters.ViewPagerAdapter
import com.google.android.material.button.MaterialButton

class MainActivity : AppCompatActivity() {

    private lateinit var viewPager: ViewPager2
    private lateinit var toggleButton: MaterialButton
    private var isMasterScreen = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewPager = findViewById(R.id.viewPager)
        toggleButton = findViewById(R.id.toggleButton)

        val adapter = ViewPagerAdapter(this)
        viewPager.adapter = adapter

        toggleButton.setOnClickListener {
            isMasterScreen = !isMasterScreen
            viewPager.currentItem = if (isMasterScreen) 1 else 0
            toggleButton.text = if (isMasterScreen) "Switch to Slave" else "Switch to Master"
        }
    }
}
