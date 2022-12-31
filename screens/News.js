import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import BirdList from "../components/BirdList";



const News = () => {
    const [news, setNews] = useState()
    useEffect(() => {
        const loadNews = async () => {
            const response = await fetch(`https://newsapi.org/v2/everything?q=animal+nature+birds+science&excludeDomains=skepticalscience.com,Fox.com,anothermag.com&from=2022-11-30&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`)
            const data = await response.json()
            setNews(data.articles)
        }

        loadNews()

    },[])

    let newsLoading = <Text>News Loading</Text>

    if (news) {
        newsLoading = (<BirdList data={news} />)
    }

    return(
        <View>
            {newsLoading}
        </View>
    )
}

export default News

const styles = StyleSheet.create({

})