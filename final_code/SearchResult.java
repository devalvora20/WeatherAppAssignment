package com.example.weatherapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class SearchResult extends AppCompatActivity {
    String ENVIRONMENT_URL = "http://hw9backend-env.yvgs3r7x7g.us-east-2.elasticbeanstalk.com";
    JSONObject currently;
    JSONObject daily;
    JSONObject card1Data = new JSONObject();
    JSONObject card2Data = new JSONObject();
    String city;
    String toastText;
    TextView searchResultTextView;
    FloatingActionButton fab;
    LinearLayout progressBarLayout;
    LinearLayout outputLayout;
    CardView card1View;
    Boolean isFavorite;
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    final String degreeSymbol = ""+(char) 0x00B0;
    Map<String,Integer> summaryIconMap =  new HashMap<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.search_result);
        progressBarLayout = findViewById(R.id.progressBarSearchActivity);
        outputLayout = findViewById(R.id.outputSearchActivity);
        searchResultTextView = findViewById(R.id.searchResultText);
        card1View = findViewById(R.id.card1View);

        showProgress();
        Intent mainIntent = getIntent();
        fab = findViewById(R.id.fab);
        city = mainIntent.getStringExtra("city");
        setTitle(city);

        pref = getApplicationContext().getSharedPreferences("favorites", 0);
        editor = pref.edit();
        isFavorite = !pref.getString(city,"null").equals("null");

        if(isFavorite){
            fab.setImageDrawable(getResources().getDrawable(R.drawable.remove_fav));
        }
        else{
            fab.setImageDrawable(getResources().getDrawable(R.drawable.add_fav));
        }

        summaryIconMap.put("clear-day",R.drawable.weather_sunny);
        summaryIconMap.put("clear-night",R.drawable.weather_night);
        summaryIconMap.put("rain",R.drawable.weather_rainy);
        summaryIconMap.put("sleet",R.drawable.weather_snowy_rainy);
        summaryIconMap.put("snow",R.drawable.weather_snowy);
        summaryIconMap.put("wind",R.drawable.weather_windy_variant);
        summaryIconMap.put("fog",R.drawable.weather_fog);
        summaryIconMap.put("cloudy",R.drawable.weather_cloudy);
        summaryIconMap.put("partly-cloudy-night",R.drawable.weather_night_partly_cloudy);
        summaryIconMap.put("partly-cloudy-day",R.drawable.weather_partly_cloudy);


        final ImageView iconImageView = findViewById(R.id.iconImg);
        final TextView temperatureTextView =  findViewById(R.id.temperature);
        final TextView summaryTextView =  findViewById(R.id.summary);
        final TextView cityTextView =  findViewById(R.id.city);
        final TextView humidityValueTextView =  findViewById(R.id.humidityValue);
        final TextView windSpeedValueTextView =  findViewById(R.id.windSpeedValue);
        final TextView visibilityValueTextView =  findViewById(R.id.visibilityValue);
        final TextView pressureValueTextView =  findViewById(R.id.pressureValue);

        RequestQueue queue = Volley.newRequestQueue(this);
        String cityForURL = city;
        cityForURL.replaceAll(" ", "%20");
        String route = "/location?city=" + cityForURL;
        String locationURL = ENVIRONMENT_URL + route;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, locationURL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        try {
                            Log.d("TAG ", response);
                            JSONObject obj = new JSONObject(response);
                            double latitude = obj.getDouble("lat");
                            double longitude = obj.getDouble("lng");

                            RequestQueue queue = Volley.newRequestQueue(getApplicationContext());
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
                                                JSONArray dailyData = daily.getJSONArray("data");
                                                String temperatureVal = currently.has("temperature")?  Math.round(Double.parseDouble( currently.get("temperature").toString()))+degreeSymbol+"F" : "N/A";

                                                card1Data.put("icon",currently.get("icon"));
                                                card1Data.put("temperature",temperatureVal);
                                                card1Data.put("summary",currently.get("summary"));
                                                card1Data.put("city",city);

                                                iconImageView.setImageResource(summaryIconMap.get(currently.get("icon")));
                                                temperatureTextView.setText(temperatureVal);
                                                summaryTextView.setText((String)currently.get("summary"));
                                                cityTextView.setText(city);

                                                String humidityVal = currently.has("humidity")?  Math.round( Double.parseDouble( currently.get("humidity").toString())*100)+" %" : "N/A";

                                                String windSpeedVal = currently.has("windSpeed")?  String.format("%.2f", Double.parseDouble( currently.get("windSpeed").toString()))+" mph" : "N/A";

                                                String visibilityVal = currently.has("visibility")?  String.format("%.2f", Double.parseDouble( currently.get("visibility").toString()))+" km" : "N/A";

                                                String pressureVal = currently.has("pressure")?  String.format("%.2f", Double.parseDouble( currently.get("pressure").toString()))+" mb" : "N/A";


                                                card2Data.put("humidity",humidityVal);
                                                card2Data.put("windSpeed",windSpeedVal);
                                                card2Data.put("visibility",visibilityVal);
                                                card2Data.put("pressure",pressureVal);

                                                humidityValueTextView.setText(""+card2Data.get("humidity"));
                                                windSpeedValueTextView.setText(""+card2Data.get("windSpeed"));
                                                visibilityValueTextView.setText(""+card2Data.get("visibility"));
                                                pressureValueTextView.setText(""+card2Data.get("pressure"));

                                                addDataToCard3Table(dailyData);

                                            }catch (Throwable t){
                                                Log.d("Error","json in error card1 or card2");
                                            }
                                        }
                                    }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.d("ERROR","That didn't work! : "+error.getMessage());
                                }
                            });

                            queue.add(stringRequest);
                        } catch (Throwable t) {
                            Log.d("Error", "json in error card1 or card2");
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("", "That didn't work! : " + error.getMessage());
            }
        });
        queue.add(stringRequest);


        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(isFavorite){
                    toastText = city+" was removed from favorites";
                    editor.remove(city);
                    editor.commit();
                    isFavorite = false;
                    fab.setImageDrawable(getResources().getDrawable(R.drawable.add_fav));
                } else{
                    toastText = city+" was added to favorites";
                    JSONObject detailedData = new JSONObject();
                    try {
                        detailedData.put("currently", currently);
                        detailedData.put("daily", daily);
                        editor.putString(city,detailedData.toString());
                        editor.commit();
                        isFavorite = true;
                    }catch (Throwable t){ Log.d("Error"," while putting data to send to other intent "); }
                    fab.setImageDrawable(getResources().getDrawable(R.drawable.remove_fav));
                }
                Toast.makeText(getApplicationContext(),toastText,Toast.LENGTH_SHORT).show();
            }
        });
        card1View.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                gotoDetails(view);
            }
        });
    }


    public void addDataToCard3Table(JSONArray dailyData){
        TableLayout card3TableLayout = findViewById(R.id.card3Table);
        for( int i = 0; i < dailyData.length(); i++){
            JSONObject dailyRow;
            try {
                dailyRow = dailyData.getJSONObject(i);

                TableRow row= new TableRow(this);
                TableRow.LayoutParams lp = new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT);
                row.setLayoutParams(lp);

                TextView card3DateTextView = new TextView(this);
                TextView card3MinTextView = new TextView(this);
                TextView card3MaxTextView = new TextView(this);
                ImageView card3IconImageView = new ImageView(this);

                card3DateTextView.setTextColor(getResources().getColor(R.color.white));
                card3MinTextView.setTextColor(getResources().getColor(R.color.white));
                card3MaxTextView.setTextColor(getResources().getColor(R.color.white));
                card3DateTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3MinTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3MaxTextView.setTextSize(getResources().getDimension(R.dimen.tableText));
                card3IconImageView.setPadding(55,55,55,55);
                card3DateTextView.setPadding(55,55,55,15);



                Date fullDate = new Date(Long.parseLong(dailyRow.get("time").toString()) * 1000);
                String date = (fullDate.getMonth()+1) + "/" + fullDate.getDate() + "/" + (1900+fullDate.getYear());
                double min = Double.parseDouble( dailyRow.get("temperatureLow").toString());
                double max = Double.parseDouble( dailyRow.get("temperatureHigh").toString());

                card3DateTextView.setText(date);
                card3IconImageView.setImageResource(summaryIconMap.get(dailyRow.get("icon")));
                card3MinTextView.setText(Math.round(min)+"");
                card3MaxTextView.setText(Math.round(max)+"");

                row.addView(card3DateTextView);
                row.addView(card3IconImageView);
                row.addView(card3MinTextView);
                row.addView(card3MaxTextView);
                row.setBackgroundResource(R.drawable.table_border);
                card3TableLayout.addView(row,i);
            }catch (Throwable t){ Log.d("ERROR"," Error while adding to table ");}
        }
    }

    public void gotoDetails(View view){
        Intent detailsIntent = new Intent(this, DetailedInformation.class);
        JSONObject detailedData = new JSONObject();
        try {
            detailedData.put("currently", currently);
            detailedData.put("daily", daily);
            detailedData.put("city", city);
        }catch (Throwable t){ Log.d("Error"," while putting data to send to other intent "); }
//        detailsIntent.putExtra("currently",currently.toString());
        detailsIntent.putExtra("data",detailedData.toString());
        startActivity(detailsIntent);
    }
    public void showProgress(){
        progressBarLayout.setVisibility(View.VISIBLE);
        outputLayout.setVisibility(View.GONE);
        searchResultTextView.setVisibility(View.GONE);
    }
    public void hideProgress(){
        progressBarLayout.setVisibility(View.GONE);
        outputLayout.setVisibility(View.VISIBLE);
        searchResultTextView.setVisibility(View.VISIBLE);
    }
}
