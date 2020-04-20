package com.example.weatherapp;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.os.Bundle;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.tabs.TabLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatAutoCompleteTextView;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;
import androidx.viewpager.widget.ViewPager;

import android.os.Message;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.LinearLayout;
//import android.widget.SearchView;
import androidx.appcompat.widget.SearchView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.os.Handler;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    String ENVIRONMENT_URL = "http://hw9backend-env.yvgs3r7x7g.us-east-2.elasticbeanstalk.com";
    String TAG = "DEBUG";
    private TabLayout tab;
    private ViewPager viewPager;
    AutoCompleteAdapter newsAdapter;
    SearchView searchView;
    PlansPagerAdapter adapter;
    LinearLayout progressBarLayout;
    LinearLayout outputLayout;
    Boolean resumable=false;
    SearchView.SearchAutoComplete searchAutoComplete;
    JSONObject card1Data = new JSONObject();
    JSONObject card2Data = new JSONObject();
    JSONObject currently;
    JSONObject daily;
    JSONObject currentLocationData;
    double latitude;
    double longitude;
    ArrayList<String> stringList;
    String region;

    String country;
    String city = "Los Angeles, CA, USA";
    Map<String,Integer> summaryIconMap =  new HashMap<>();
    final String degreeSymbol = ""+(char) 0x00B0;
    Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme_NoActionBar);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        progressBarLayout = findViewById(R.id.progressBarMainActivity);
        outputLayout = findViewById(R.id.outputMainActivity);
        tab = findViewById(R.id.tabsMain1);
        viewPager = findViewById(R.id.viewPagerMain1);
        showProgress();

        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(),"Grant Location Permission",Toast.LENGTH_SHORT);
        }
        context = this;
        RequestQueue queue1 = Volley.newRequestQueue(context);
        String url1 ="http://ip-api.com/json/";
        StringRequest stringRequest1 = new StringRequest(Request.Method.GET, url1,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject obj = new JSONObject(response);
                            city = obj.get("city").toString();
                            region = obj.get("region").toString();
                            country = obj.get("countryCode").toString();
                            city = city+", "+region+", "+country;

                            latitude = Double.parseDouble(obj.get("lat").toString());
                            longitude = Double.parseDouble(obj.get("lat").toString());
                            RequestQueue queue = Volley.newRequestQueue(context);
                            String route = "/forecast?latitude="+latitude+"&longitude="+longitude;
                            String url =ENVIRONMENT_URL+route;
                            StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                                    new Response.Listener<String>() {
                                        @Override
                                        public void onResponse(String response) {
                                            try {
                                                hideProgress();
                                                JSONObject jsonResponse = new JSONObject(response);
                                                currently = new JSONObject(jsonResponse.get("currently").toString());
                                                daily = new JSONObject( jsonResponse.get("daily").toString() );
                                                currentLocationData = new JSONObject();
                                                try {
                                                    currentLocationData.put("currently", currently);
                                                    currentLocationData.put("daily", daily);

                                                }catch (Throwable t){ Log.d("Error"," while putting data to send to other intent "); }


                                                SharedPreferences pref = getApplicationContext().getSharedPreferences("favorites", 0);
                                                int size = pref.getAll().size();
                                                tab.addTab(tab.newTab().setText("current" + 0));
                                                for (int k = 0; k <size; k++) {
                                                    tab.addTab(tab.newTab().setText("favorite" + k));
                                                }
                                                adapter = new PlansPagerAdapter
                                                        (getSupportFragmentManager(), tab.getTabCount(), getApplicationContext(), currentLocationData, city);
                                                viewPager.setAdapter(adapter);
                                                viewPager.setOffscreenPageLimit(1);
                                                viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tab));

//                                                viewPager.setPadding(-10,0,-10,0);
//                                                if (tab.getTabCount() <= 6) {
//                                                    tab.setTabMode(TabLayout.MODE_FIXED);
//                                                } else {
//                                                    tab.setTabMode(TabLayout.MODE_SCROLLABLE);
//                                                }
                                                tab.setTabMode(TabLayout.MODE_FIXED);
                                                resumable = true;
                                            }catch (Throwable t){
                                                Log.d("Error","json in error card1 or card2 main activity");
                                            }
                                        }
                                    }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.d(TAG,"That didn't work! : "+error.getMessage());
                                }
                            });

                            queue.add(stringRequest);

                        }catch (Throwable t){Log.d("ERROR","ipapi error");}
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d(TAG,"That didn't work! : "+error.getMessage());
            }
        });

        queue1.add(stringRequest1);


    }

    public void getAutoCompleteCities(String city1, final AutoCompleteAdapter adapter){


        RequestQueue queue = Volley.newRequestQueue(this);
        city1.replaceAll(" ","%20");
        String route = "/autocomplete?input="+city1;
        String url =ENVIRONMENT_URL+route;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONArray arr = new JSONArray(response);
                            stringList.clear();
                            int size = arr.length();
                            for( int i = 0; i < 5; i++) {
                                String item1;
                                if(i<size) {
                                    item1 = arr.get(i).toString();
                                    stringList.add(item1);
                                }
                            }

                            adapter.dataSetUpdated(stringList);
                        }catch (Throwable t){
                            Log.d("Error"," while getting autocomplete cities");
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("","That didn't work! : "+error.getMessage());
            }
        });
        queue.add(stringRequest);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(resumable){
            tab.removeAllTabs();
            SharedPreferences pref = getApplicationContext().getSharedPreferences("favorites", 0);
            int size = pref.getAll().size();
            Log.d("size",""+size);
            tab.addTab(tab.newTab().setText("current" + 0));
            for (int k = 0; k <size; k++) {
                tab.addTab(tab.newTab().setText("favorite" + k));
            }
            adapter = new PlansPagerAdapter
                    (getSupportFragmentManager(), tab.getTabCount(), getApplicationContext(), currentLocationData, city);
            viewPager.setAdapter(adapter);
            viewPager.setOffscreenPageLimit(1);
            viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tab));
            if (tab.getTabCount() <= 6) {
                tab.setTabMode(TabLayout.MODE_FIXED);
            } else {
                tab.setTabMode(TabLayout.MODE_SCROLLABLE);
            }
        }

    }

    public void removeTab(int position, String key){
        if (tab.getTabCount() >= 1 && position<tab.getTabCount()) {
            tab.removeTabAt(position);
            adapter.removeTabPage(key);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        stringList = new ArrayList<>();
        MenuItem searchItem = menu.findItem(R.id.action_search);
        searchView = (SearchView) searchItem.getActionView();
        searchAutoComplete = searchView.findViewById(androidx.appcompat.R.id.search_src_text);

        newsAdapter = new AutoCompleteAdapter(this, android.R.layout.simple_dropdown_item_1line,stringList);
        searchAutoComplete.setAdapter(newsAdapter);
        searchAutoComplete.setDropDownBackgroundResource(android.R.color.white);

        searchAutoComplete.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int itemIndex, long id) {
                String queryString=(String)adapterView.getItemAtPosition(itemIndex);
                searchAutoComplete.setText("" + queryString);
            }
        });

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String queryCity) {
                Intent searchResultIntent = new Intent(getApplicationContext(), SearchResult.class);
                searchResultIntent.putExtra("city",queryCity);
                startActivity(searchResultIntent);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                getAutoCompleteCities(newText, newsAdapter);
                return false;
            }
        });

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Log.d("item selected","item");
        stringList.add("a");
        newsAdapter.dataSetUpdated(stringList);

        return super.onOptionsItemSelected(item);
    }

    public void showProgress(){
        progressBarLayout.setVisibility(View.VISIBLE);
        outputLayout.setVisibility(View.GONE);
    }
    public void hideProgress(){
        progressBarLayout.setVisibility(View.GONE);
        outputLayout.setVisibility(View.VISIBLE);
    }


}
