package com.example.weatherapp;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class PhotosFragment extends Fragment {
    String ENVIRONMENT_URL = "http://hw9backend-env.yvgs3r7x7g.us-east-2.elasticbeanstalk.com";
    int position;
    static JSONObject detailedData;
    LinearLayout progressBarLayout;
    LinearLayout resultLayout;
    List<String> imgUrlList = new ArrayList<>();
    RVAdapter adapter;
    public static Fragment getInstance(int position, JSONObject obj) {
        detailedData = obj;
        Bundle bundle = new Bundle();
        bundle.putInt("pos", position);
        PhotosFragment fragment = new PhotosFragment();
        fragment.setArguments(bundle);
        return fragment;

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        position = getArguments().getInt("pos");

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_photos, container, false);
        progressBarLayout = v.findViewById(R.id.progressBarPhotosActivity);
        resultLayout = v.findViewById(R.id.resultPhotosActivity);
        showProgress();
        adapter = new RVAdapter(getContext());
        RecyclerView rv = v.findViewById(R.id.rv1);
        LinearLayoutManager llm = new LinearLayoutManager(getContext());
        rv.setLayoutManager(llm);
        rv.setAdapter(adapter);

        return v;
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        String city="";
        try {
            city = detailedData.get("city").toString();
        }catch (Throwable t){}
        RequestQueue queue = Volley.newRequestQueue(getActivity());
        String route = "/photos?city="+city;
        String url =ENVIRONMENT_URL+route;
        final View vcopy = view;

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONObject jsonResponse = new JSONObject(response);
                            JSONObject photos = new JSONObject(jsonResponse.get("photos").toString());
                            JSONArray items = photos.getJSONArray("items");
                            for( int i = 0; i < items.length(); i++) {
                                JSONObject item1;
                                item1 = items.getJSONObject(i);
                                imgUrlList.add(item1.get("link").toString());
                            }
                            hideProgress();
                            adapter.dataSetUpdated(imgUrlList);

                        }catch (Throwable t){
                            Log.d("Error","json in error card1 or card2");
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
    public void showProgress(){
        resultLayout.setVisibility(View.GONE);
        progressBarLayout.setVisibility(View.VISIBLE);
    }
    public void hideProgress(){
        progressBarLayout.setVisibility(View.GONE);
        resultLayout.setVisibility(View.VISIBLE);
    }
}
