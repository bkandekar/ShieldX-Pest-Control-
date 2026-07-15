package com.example

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                Surface(
                    modifier = Modifier
                        .fillMaxSize()
                        .statusBarsPadding()
                        .navigationBarsPadding()
                ) {
                    PestControlWebView()
                }
            }
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PestControlWebView() {
    var webViewRef by remember { mutableStateOf<WebView?>(null) }

    // Intercept back presses to navigate backwards in WebView history
    BackHandler(enabled = webViewRef?.canGoBack() == true) {
        webViewRef?.goBack()
    }

    AndroidView(
        modifier = Modifier.fillMaxSize(),
        factory = { context ->
            WebView(context).apply {
                webViewRef = this
                settings.apply {
                    javaScriptEnabled = true
                    domStorageEnabled = true
                    allowFileAccess = true
                    loadWithOverviewMode = true
                    useWideViewPort = true
                    cacheMode = WebSettings.LOAD_DEFAULT
                }
                
                // Add Native JavaScript Bridge interface
                addJavascriptInterface(WebAppInterface(context), "AndroidInterface")

                webViewClient = object : WebViewClient() {
                    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                        if (url == null) return false
                        
                        // Handle native Intents
                        return when {
                            url.startsWith("tel:") -> {
                                val intent = Intent(Intent.ACTION_DIAL, Uri.parse(url))
                                context.startActivity(intent)
                                true
                            }
                            url.startsWith("mailto:") -> {
                                val intent = Intent(Intent.ACTION_SENDTO, Uri.parse(url))
                                context.startActivity(intent)
                                true
                            }
                            url.contains("wa.me") || url.contains("whatsapp.com") -> {
                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                context.startActivity(intent)
                                true
                            }
                            url.contains("maps.google") || url.contains("goo.gl/maps") -> {
                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                context.startActivity(intent)
                                true
                            }
                            else -> false
                        }
                    }
                }
                
                webChromeClient = WebChromeClient()
                loadUrl("file:///android_asset/index.html")
            }
        },
        update = {
            // No-op for updates since the WebView state is self-contained
        }
    )
}

class WebAppInterface(private val context: Context) {
    @JavascriptInterface
    fun onInspectionBooked(name: String, phone: String, service: String, date: String) {
        Toast.makeText(
            context,
            "Booking Received! Thank you $name, we will call you on $phone to confirm the schedule on $date.",
            Toast.LENGTH_LONG
        ).show()
    }
}

