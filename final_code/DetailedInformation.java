package com.example.weatherapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.drawable.DrawableCompat;
import androidx.viewpager.widget.ViewPager;

import android.app.ActionBar;
import android.content.Intent;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.widget.Toolbar;

import com.google.android.material.tabs.TabLayout;

import org.json.JSONObject;

public class DetailedInformation extends AppCompatActivity {
    private Toolbar toolbar;
    private TabLayout tabLayout;
    private ViewPager viewPager;
    private JSONObject detailedData;
    private String city;
    LinearLayout progressBarLayout;
//    LinearLayout outputLayout;
    private String temperature;
    final int[] ICONS = new int[]{
            R.drawable.today,
            R.drawable.weekly,
            R.drawable.photos};
    final int[] ICONS_WHITE = new int[]{
            R.drawable.today_white,
            R.drawable.weekly_white,
            R.drawable.photos_white};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);
        Intent mainIntent = getIntent();
        progressBarLayout = findViewById(R.id.progressBarDetailedActivity);
//        outputLayout = findViewById(R.id.outputDetailedActivity);

        String data = mainIntent.getStringExtra("data");
        try {
            detailedData = new JSONObject(data);
            JSONObject currently = new JSONObject( detailedData.get("currently").toString());
            city = detailedData.get("city").toString();
            temperature= currently.has("temperature")?  Math.round(Double.parseDouble( currently.get("temperature").toString()))+"": "N/A";
            setTitle(city);
        }catch (Throwable t){}
        Drawable drawable = ContextCompat.getDrawable(this, R.drawable.today);
        Drawable wrappedDrawable = DrawableCompat.wrap(drawable);
        Drawable mutableDrawable = wrappedDrawable.mutate();
        DrawableCompat.setTint(mutableDrawable, ContextCompat.getColor(this, R.color.white));


        viewPager = findViewById(R.id.viewpager);
        ViewPagerAdapter adapter = new ViewPagerAdapter(getSupportFragmentManager(), detailedData);
        viewPager.setAdapter(adapter);
        tabLayout = findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(viewPager);

        setIcons(ICONS_WHITE[0],ICONS[1],ICONS[2]);
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {

                int position = tab.getPosition();
                Log.d("here",position+" here");
                switch (position){
                    case 0: setIcons(ICONS_WHITE[0],ICONS[1],ICONS[2]);
                            break;
                    case 1: setIcons(ICONS[0],ICONS_WHITE[1],ICONS[2]);
                            break;
                    case 2: setIcons(ICONS[0],ICONS[1],ICONS_WHITE[2]);
                            break;
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

    }

    public void setIcons(int today, int weekly, int photos){
        tabLayout.getTabAt(0).setIcon(today);
        tabLayout.getTabAt(1).setIcon(weekly);
        tabLayout.getTabAt(2).setIcon(photos);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_detailed, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            String tweetData = "Check Out "+city+"’s Weather! It is "+temperature+"°F!";
            String url ="https://twitter.com/intent/tweet?text="+tweetData+"&hashtags=CSCI571WeatherSearch";
            Uri uriUrl = Uri.parse(url);
            Intent launchBrowser = new Intent(Intent.ACTION_VIEW, uriUrl);
            startActivity(launchBrowser);
        }
        return super.onOptionsItemSelected(item);
    }
    public void showProgress(){
//        progressBarLayout.setVisibility(View.VISIBLE);
//        outputLayout.setVisibility(View.GONE);
    }
    public void hideProgress(){
//        progressBarLayout.setVisibility(View.GONE);
//        outputLayout.setVisibility(View.VISIBLE);
    }
}
