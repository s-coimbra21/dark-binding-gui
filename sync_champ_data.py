import os
import json
import requests


def get_latest_version():
    url = "https://ddragon.leagueoflegends.com/api/versions.json"
    response = requests.get(url)
    versions = response.json()
    return versions[0]


def get_champion_data(version, language="en_US"):
    url = f"https://ddragon.leagueoflegends.com/cdn/{version}/data/{language}/champion.json"
    response = requests.get(url)
    data = response.json()
    return data


def save_champion_data(version, data, file_name="static/champions.json"):
    data["version"] = version
    with open(file_name, "w") as f:
        json.dump(data, f, indent=4)


def load_champion_data(file_name="static/champions.json"):
    if os.path.exists(file_name):
        with open(file_name, "r") as f:
            data = json.load(f)
        return data
    return None


def update_champion_data():
    latest_version = get_latest_version()
    local_data = load_champion_data()

    if local_data is None or local_data["version"] != latest_version:
        new_data = get_champion_data(latest_version)
        save_champion_data(latest_version, new_data)
        print(f"Updated to version {latest_version}.")
    else:
        print("Already up to date.")


update_champion_data()
