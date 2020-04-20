package com.example.weatherapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

public class RVAdapter extends RecyclerView.Adapter<RVAdapter.PersonViewHolder>{

    List<String> imgUrlList;
    Context c;
    RVAdapter(Context c){
        this.c = c;
        imgUrlList = new ArrayList<>();
    }
    RVAdapter(List<String> urls){
        this.imgUrlList = urls;
    }

    @Override
    public PersonViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.photo_card, viewGroup, false);
        PersonViewHolder pvh = new PersonViewHolder(v);
        return pvh;
    }

    @Override
    public int getItemCount() {
        return imgUrlList.size();
    }

    @Override
    public void onBindViewHolder(PersonViewHolder personViewHolder, int i) {
        Picasso.with(c).load(imgUrlList.get(i)).into(personViewHolder.cityPhoto);
//        Picasso.get().load(url).into(view);
//        personViewHolder.cityPhoto.setImageResource(R.drawable.weather_snowy_rainy);
    }
    @Override
    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
        super.onAttachedToRecyclerView(recyclerView);
    }

    public void dataSetUpdated(List<String> l){
        imgUrlList = l;
        this.notifyDataSetChanged();
    }

    public static class PersonViewHolder extends RecyclerView.ViewHolder {
        CardView cv;
        ImageView cityPhoto;

        PersonViewHolder(View itemView) {
            super(itemView);
            cv = itemView.findViewById(R.id.cv);
            cityPhoto = itemView.findViewById(R.id.cityPhoto);
        }
    }

}