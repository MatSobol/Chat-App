package com.backend.chirp.Utility.Converters;

public interface Converter<F, T> {
    T convert(F from);
}