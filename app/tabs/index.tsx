import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Image,
} from "react-native";
import { useState, useEffect } from "react";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

const Index = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <View className="flex-1 px-5">
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                <View className="my-5">
                    <SearchBar
                        placeholder="Search for a movie"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                {loading && (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="my-3"
                    />
                )}

                {error && (
                    <Text className="text-red-500 px-5 my-3">
                        Error: {error.message}
                    </Text>
                )}

                {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                    <Text className="text-xl text-white font-bold mb-3">
                        Search Results for{" "}
                        <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                )}

                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 20,
                        marginVertical: 10,
                    }}
                    className="pb-32"
                    ListEmptyComponent={
                        !loading && !error ? (
                            <View className="mt-10 px-5">
                                <Text className="text-center text-gray-500">
                                    {searchQuery.trim()
                                        ? "No movies found"
                                        : "Start typing to search for movies"}
                                </Text>
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    );
};

export default Index;